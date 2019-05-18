FROM python:3

WORKDIR /app

COPY ./requirements.txt ./
COPY ./Makefile ./

RUN make venv

COPY ./gc_core ./gc_core
COPY ./entry.py ./entry.py

CMD ["python", "entry.py"]