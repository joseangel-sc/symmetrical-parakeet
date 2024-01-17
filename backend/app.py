from flask import Flask, jsonify, request
from flask_cors import CORS
from nodes import make_all_trees

app = Flask(__name__)
CORS(app)


@app.route('/generate-trees', methods=['GET'])
def generate_trees():
    n = request.args.get('n', type=int)
    max_leaf = request.args.get('max_leaf', type=int)

    if n is None or max_leaf is None:
        return jsonify({"error": "Missing parameters 'n' or 'max_leaf'"}), 400

    trees = make_all_trees(n, max_leaf)
    return jsonify(trees)


if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')
