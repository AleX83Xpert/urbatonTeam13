.PHONY: all

ACTIVATE = . venv/bin/activate

all: venv
	$(ACTIVATE) && python entry.py

venv:
	virtualenv -ppython3 venv
	$(ACTIVATE) && pip install -r requirements.txt


upgrade:
	$(ACTIVATE)
	pip install -U -r requirements.txt

clean:
	$(RM) -R venv