.PHONY: all

ACTIVATE = . venv/bin/activate

all: venv
	$(ACTIVATE) && python entry.py

venv:
	python3 -m venv venv
	$(ACTIVATE) && pip install -r requirements.txt


upgrade:
	$(ACTIVATE) && pip install -U -r requirements.txt

clean:
	$(RM) -R venv