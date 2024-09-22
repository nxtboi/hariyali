from flask import Blueprint, jsonify, request
from backend.models import User, db

main = Blueprint('main', __name__)

@main.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"message": "Invalid email. User does not exist!"}), 404

    if user.password_hash == password:
        return jsonify({"message": "Logged in successfully!"}), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401

# @main.route('/forgot-password', methods=['POST'])
# def forgot_password():
#     from backend.app import db
#     data = request.get_json()
#     email = data.get('email')
#     user = users.query.filter_by(email=email).first()

#     if user:
#         # Here you would send an email with a password reset link
#         return jsonify({'message': f'Reset password link sent to {email}'}), 200
#     else:
#         return jsonify({'message': 'No account found with that email'}), 404