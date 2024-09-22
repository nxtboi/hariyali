from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate  # Import Migrate
from backend.config import Config

db = SQLAlchemy()
migrate = Migrate()  # Initialize Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)  # Set up Flask-Migrate

    CORS(app)  # Adding CORS support

    from backend.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)

    return app