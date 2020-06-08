from locust import HttpUser, between, task


class WebsiteUser(HttpUser):
    host = "http://10.152.183.140"
    wait_time = between(5, 15)
    
    @task
    def index(self):
        self.client.get("/")
        
    @task
    def about(self):
        self.client.get("/factorial/100")