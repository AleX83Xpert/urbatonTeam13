FROM python:3

WORKDIR /app

COPY ./requirements.txt ./
RUN pip install -r requirements.txt

COPY ./gc_core ./gc_core
COPY ./entry.py ./entry.py

CMD ["python", "entry.py"]