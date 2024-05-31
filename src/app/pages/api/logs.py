from http.server import BaseHTTPRequestHandler
import json
import pandas as pd # type: ignore

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        log_entries = json.loads(post_data)

        ages = []
        for entry in log_entries:
            try:
                data = json.loads(entry)
                if "isage" in data:
                    ages.append(data["isage"])
            except json.JSONDecodeError:
                continue

        age_distribution = pd.Series(ages).value_counts().to_dict()

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = {
            "age_distribution": age_distribution,
            "extracted_data": ages
        }
        self.wfile.write(json.dumps(response).encode())

