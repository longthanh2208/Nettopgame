from flask import Flask, render_template, jsonify, request
import json
import os
import smtplib
import ssl
import logging
import traceback
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash
import time
import secrets

# --- Setup Logging ---
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'static/images')
app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'webp', 'gif'}
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# --- Data Store Paths ---
USER_DB_PATH = os.path.join(os.path.dirname(__file__), 'users.json')
PRODUCT_DB_PATH = os.path.join(os.path.dirname(__file__), 'products.json')
ORDER_DB_PATH = os.path.join(os.path.dirname(__file__), 'orders.json')

# --- Email Configuration ---
# Ưu tiên lấy từ Environment Variables (trên Render), fallback về hardcode để test local
MAIL_SERVER = "smtp.gmail.com"
MAIL_PORT = 587
MAIL_SENDER = os.environ.get("MAIL_SENDER")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
if not MAIL_SENDER or not MAIL_PASSWORD:
    logger.warning("⚠️  MAIL_SENDER hoặc MAIL_PASSWORD chưa được cấu hình! Chức năng gửi email sẽ không hoạt động.")

# --- Helper Functions ---
def load_data(path, default=[]):
    if not os.path.exists(path):
        return default
    with open(path, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except json.JSONDecodeError:
            return default

def save_data(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

def send_reset_email(to_email, reset_link):
    subject = "Khôi phục mật khẩu - NETTOPGAME"
    body = f"Chào bạn,\n\nNhấn vào link sau để đặt lại mật khẩu:\n{reset_link}\n\nLink này chỉ dùng được 1 lần.\n\nTrân trọng,\nNETTOPGAME"
    
    message = MIMEMultipart()
    message["From"] = MAIL_SENDER
    message["To"] = to_email
    message["Subject"] = subject
    message.attach(MIMEText(body, "plain", "utf-8"))
    
    logger.info(f"=== BẮT ĐẦU GỬI EMAIL ===")
    logger.info(f"  Đến: {to_email}")
    logger.info(f"  Từ: {MAIL_SENDER}")
    logger.info(f"  Server: {MAIL_SERVER}:{MAIL_PORT}")
    logger.info(f"  Password (4 ký tự đầu): {MAIL_PASSWORD[:4]}...")
    
    context = ssl.create_default_context()
    try:
        with smtplib.SMTP(MAIL_SERVER, MAIL_PORT, timeout=30) as server:
            server.set_debuglevel(1)  # Log chi tiết SMTP commands
            logger.info("  [1/4] Đang kết nối SMTP server...")
            server.ehlo()
            logger.info("  [2/4] Đang bắt đầu TLS...")
            server.starttls(context=context)
            server.ehlo()
            logger.info("  [3/4] Đang đăng nhập...")
            server.login(MAIL_SENDER, MAIL_PASSWORD)
            logger.info("  [4/4] Đang gửi email...")
            server.sendmail(MAIL_SENDER, to_email, message.as_string())
        logger.info(f"=== GỬI EMAIL THÀNH CÔNG đến {to_email} ===")
        return True
    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"=== LỖI XÁC THỰC GMAIL ===")
        logger.error(f"  Gmail từ chối đăng nhập. Mã lỗi: {e.smtp_code}")
        logger.error(f"  Chi tiết: {e.smtp_error}")
        logger.error(f"  GIẢI PHÁP: Tạo App Password mới tại https://myaccount.google.com/apppasswords")
        return False
    except smtplib.SMTPException as e:
        logger.error(f"=== LỖI SMTP ===")
        logger.error(f"  Loại lỗi: {type(e).__name__}")
        logger.error(f"  Chi tiết: {e}")
        return False
    except Exception as e:
        logger.error(f"=== LỖI KHÔNG XÁC ĐỊNH ===")
        logger.error(f"  Loại lỗi: {type(e).__name__}")
        logger.error(f"  Chi tiết: {e}")
        logger.error(traceback.format_exc())
        return False

# --- Routes ---
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/products")
def get_products():
    return jsonify(load_data(PRODUCT_DB_PATH))

# --- Authentication ---
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    users = load_data(USER_DB_PATH)
    if any(u['email'] == data['email'] for u in users):
        return jsonify({"status": "error", "message": "Email đã được đăng ký!"}), 400
    new_user = {"id": len(users) + 1, "name": data['name'], "email": data['email'], "password": generate_password_hash(data['password']), "role": "user"}
    users.append(new_user)
    save_data(USER_DB_PATH, users)
    user_copy = new_user.copy()
    user_copy.pop('password', None)
    return jsonify({"status": "success", "message": "Đăng ký thành công!", "user": user_copy})

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    users = load_data(USER_DB_PATH)
    user = next((u for u in users if u['email'] == data['email']), None)
    if user and check_password_hash(user.get('password', ''), data['password']):
        user_copy = user.copy()
        user_copy.pop('password', None)
        return jsonify({"status": "success", "message": "Đăng nhập thành công!", "user": user_copy})
    return jsonify({"status": "error", "message": "Email hoặc mật khẩu không chính xác!"}), 401

@app.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.json
    email = data.get('email')
    users = load_data(USER_DB_PATH)
    
    user = next((u for u in users if u['email'] == email), None)
    if not user:
        return jsonify({"status": "error", "message": "Email chưa đăng ký!"}), 404
        
    reset_token = secrets.token_urlsafe(32)
    user['reset_token'] = reset_token
    user['reset_token_expiry'] = time.time() + 900 # 15 phút
    save_data(USER_DB_PATH, users)
    
    host_url = request.host_url.rstrip('/')
    reset_link = f"{host_url}/reset-password?email={email}&token={reset_token}"
    
    if send_reset_email(email, reset_link):
        return jsonify({"status": "success", "message": "Link khôi phục đã gửi đến Gmail!"})
    return jsonify({"status": "error", "message": "Lỗi gửi mail!"}), 500

@app.route("/reset-password", methods=["GET", "POST"])
def reset_password():
    if request.method == "GET": return render_template("index.html")
    data = request.json
    email = data.get('email')
    new_password = data.get('password')
    token = data.get('token')
    
    if not token:
        return jsonify({"status": "error", "message": "Yêu cầu không hợp lệ (Thiếu token)!"}), 400

    users = load_data(USER_DB_PATH)
    for user in users:
        if user['email'] == email:
            if user.get('reset_token') != token:
                return jsonify({"status": "error", "message": "Token không hợp lệ hoặc đã bị thay đổi!"}), 401
            if time.time() > user.get('reset_token_expiry', 0):
                return jsonify({"status": "error", "message": "Token đã hết hạn!"}), 401
                
            user['password'] = generate_password_hash(new_password)
            user.pop('reset_token', None)
            user.pop('reset_token_expiry', None)
            save_data(USER_DB_PATH, users)
            return jsonify({"status": "success", "message": "Đã đổi mật khẩu!"})
            
    return jsonify({"status": "error", "message": "Không tìm thấy user!"}), 404

# --- Admin API (CRUD Products) ---
@app.route("/api/products", methods=["POST"])
def add_product():
    # In a real app, verify admin session/token here
    if 'image' not in request.files:
        return jsonify({"status": "error", "message": "Thiếu ảnh sản phẩm!"}), 400
    
    file = request.files['image']
    if file.filename == '' or not allowed_file(file.filename):
        return jsonify({"status": "error", "message": "File ảnh không hợp lệ!"}), 400
    
    filename = secure_filename(f"{int(time.time())}_{file.filename}")
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    products = load_data(PRODUCT_DB_PATH)
    new_product = {
        "id": int(time.time()),
        "name": request.form.get('name'),
        "price": int(request.form.get('price')),
        "category": request.form.get('category'),
        "image": f"images/{filename}"
    }
    products.insert(0, new_product)
    save_data(PRODUCT_DB_PATH, products)
    return jsonify({"status": "success", "message": "Thêm sản phẩm thành công!"})

@app.route("/api/products/<int:p_id>", methods=["PUT", "DELETE"])
def manage_product(p_id):
    products = load_data(PRODUCT_DB_PATH)
    product = next((p for p in products if p['id'] == p_id), None)
    
    if not product:
        return jsonify({"status": "error", "message": "Không tìm thấy sản phẩm!"}), 404

    if request.method == "DELETE":
        # Delete image file
        img_path = os.path.join(app.config['UPLOAD_FOLDER'], os.path.basename(product['image']))
        if os.path.exists(img_path):
            os.remove(img_path)
            
        products = [p for p in products if p['id'] != p_id]
        save_data(PRODUCT_DB_PATH, products)
        return jsonify({"status": "success", "message": "Đã xóa sản phẩm!"})

    elif request.method == "PUT":
        product['name'] = request.form.get('name')
        product['price'] = int(request.form.get('price'))
        product['category'] = request.form.get('category')
        
        if 'image' in request.files:
            file = request.files['image']
            if file and allowed_file(file.filename):
                # Delete old image
                old_img_path = os.path.join(app.config['UPLOAD_FOLDER'], os.path.basename(product['image']))
                if os.path.exists(old_img_path): os.remove(old_img_path)
                
                filename = secure_filename(f"{int(time.time())}_{file.filename}")
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                product['image'] = f"images/{filename}"
        
        save_data(PRODUCT_DB_PATH, products)
        return jsonify({"status": "success", "message": "Đã cập nhật sản phẩm!"})

@app.route("/api/orders", methods=["GET"])
def get_orders():
    return jsonify(load_data(ORDER_DB_PATH))

@app.route("/api/orders/<int:o_id>", methods=["PUT", "DELETE"])
def manage_order(o_id):
    orders = load_data(ORDER_DB_PATH)
    order = next((o for o in orders if o['id'] == o_id), None)
    if not order:
        return jsonify({"status": "error", "message": "Không tìm thấy đơn hàng!"}), 404

    if request.method == "DELETE":
        orders = [o for o in orders if o['id'] != o_id]
        save_data(ORDER_DB_PATH, orders)
        return jsonify({"status": "success", "message": "Đã xóa đơn hàng!"})

    elif request.method == "PUT":
        data = request.json
        new_status = data.get('status')
        VALID_STATUSES = ["Chờ xử lý", "Đang giao", "Đã giao", "Đã hủy"]
        if new_status not in VALID_STATUSES:
            return jsonify({"status": "error", "message": "Trạng thái không hợp lệ!"}), 400
        order['status'] = new_status
        save_data(ORDER_DB_PATH, orders)
        return jsonify({"status": "success", "message": f"Đã cập nhật trạng thái: {new_status}"})


@app.route("/api/my-orders", methods=["GET"])
def get_my_orders():
    email = request.args.get('email')
    if not email:
        return jsonify([])
    orders = load_data(ORDER_DB_PATH)
    user_orders = [o for o in orders if o.get('user', {}).get('email') == email]
    return jsonify(user_orders)

# --- Checkout ---
@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.json
    orders = load_data(ORDER_DB_PATH)
    new_order = {
        "id": int(time.time()),
        "time": time.strftime("%Y-%m-%d %H:%M:%S"),
        "user": data.get("user", {}),
        "customer": data.get("customer", {}),
        "items": data.get("items", []),
        "total": data.get("total", 0),
        "payment": data.get("payment", {}),
        "status": "Chờ xử lý"
    }
    orders.insert(0, new_order)
    save_data(ORDER_DB_PATH, orders)
    return jsonify({"status": "success", "message": "Đơn hàng đã được ghi nhận!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)