import os

os.environ["DATABASE_URL"] = "postgresql+psycopg://app_user:dev_password@localhost:5432/tradeIt"

from fastapi.testclient import TestClient
from src.main import app

client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Backend radi!"
    }