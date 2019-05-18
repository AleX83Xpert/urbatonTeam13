from gc_core.app_factory import factory


if __name__ == "__main__":
    app = factory()
    app.run("0.0.0.0", 8082, debug=True)
