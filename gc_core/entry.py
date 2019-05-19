from flask import render_template

from gc_core.app_factory import factory


if __name__ == "__main__":
    app = factory()

    @app.route("/")
    def front():
        return render_template('index.html')

    app.run("0.0.0.0", 8082, debug=True)
