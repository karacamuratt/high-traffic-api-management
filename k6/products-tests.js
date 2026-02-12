import http from "k6/http";
import { sleep } from "k6";

export const options = {
    stages: [
        { duration: "30s", target: 100 },
        { duration: "1m", target: 300 },
        { duration: "30s", target: 0 },
    ],
};

export default function () {
    http.get("http://localhost:8080/api/products?page=1&limit=20");
    sleep(0.2);
}
