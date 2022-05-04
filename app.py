import os

from flask import Flask, Response, send_file
app = Flask(__name__)


def root_dir():
    return os.path.abspath(os.path.dirname(__file__))


def get_file(filename):
    try:
        src = os.path.join(root_dir(), filename)
        with open(src) as file:
            return file.read()
    except IOError as exc:
        return str(exc)


@app.route('/', methods=['GET'])
def metrics():
    content = get_file('index.html')
    return Response(content, mimetype="text/html")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def get_resource(path):
    mimetypes = {
        ".css": "text/css",
        ".html": "text/html",
        ".js": "application/javascript",
        ".ico": "image/x-icon"
    }
    print(path)
    complete_path = os.path.join(root_dir(), path)
    ext = os.path.splitext(path)[1]
    mimetype = mimetypes.get(ext, "text/html")
    return send_file(path, mimetype=mimetype)


if __name__ == '__main__':
    app.run(port=5000)
