from backend.app import db

class User(db.Model):
    __tablename__ = 'users'  # Explicitly set the table name
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

class RelayControl(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sensor_id = db.Column(db.String(64))
    moisture_threshold = db.Column(db.Float, nullable=True)
    temperature_threshold = db.Column(db.Float, nullable=True)
    relay_status = db.Column(db.String(64))
    switch_status = db.Column(db.String(64))

    def __repr__(self):
        return f'<RelayControl {self.id}>'