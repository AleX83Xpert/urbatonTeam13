from gc_core.app_factory import factory


if __name__ == "__main__":
    app = factory()
    app.run("127.0.0.1", 8082, debug=True)
