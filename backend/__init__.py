from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# backend/__init__.py
from flask import Flask

app = Flask(__name__)

# Import routes, models, etc.
from backend import routes, models

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

