# Full Stack Engineer Task

Below is a detailed overview of the available API endpoints(including example requests and responses) and UI display.

## Upload data and show graph endpoints
<details>
<a id="upload-data"></a>
<summary><b>Upload Data CSV</b></summary>

**Endpoint:** `POST http://localhost:3000/raw-data/upload`

**Description:** Insert data into database.

**Request Body:**
- `files` (file): format untuk mengirim data file ke server.

**Response Body :**
```json
{
    "status": "success",
    "message": "Data uploaded successfully"
}
```
</details>

<details>
<a id="show-graph"></a>
<summary><b>Show Graph Result</b></summary>

**Endpoint:** `GET http://localhost:3000/raw-data/graph`
- `enodebId` : The eNodeB ID example(1041096).
- `cellId` : The Cell ID example(12).
- `startDate` : The start date for the data retrieval.
- `endDate` : The end date for the data retrieval.

**Example Request:** `http://localhost:3000/raw-data/graph?enodebId=1041096&cellId=12&startDate=2022-01-01&endDate=2024-12-31`

**Description:** Show graph.

**Response Body :**
```json
[
    {
        "resultTime": "2022-07-22T04:30:00.000Z",
        "availability": 100
    }
]
```
</details>

## Upload data and show graph UI

- Tampilan Awal : 
![tampilan-awal](https://github.com/user-attachments/assets/24a65e20-ab36-4360-a29c-a60880f56656)

- Tampilan Berhasil Upload data : 
![success-upload](https://github.com/user-attachments/assets/d31e2c29-784d-4c0d-9ca9-ea8bfaced0d1)

- Tampilan gagal upload data(case tidak memilih file untuk di upload) : 
![failed-to-upload](https://github.com/user-attachments/assets/4b06156e-9b55-43ef-b18b-8cfce44459b1)

- Tampilan awal show graph : 
![tampilan-awal-graph](https://github.com/user-attachments/assets/c5107686-3cb3-422d-91e7-ccdf2de7b6ae)

- Tampilan Error Show graph(case tidak input data untuk param) :
![error-empty-field](https://github.com/user-attachments/assets/38a32a4e-5e7e-4e15-8e33-b06e6e5b58bd)

- Tampilan Error Show graph(case end date lebih awal dari pada start date) : 
![end-date-earlier](https://github.com/user-attachments/assets/b78816a3-f7a6-4133-b9a5-193f7155df52)

- Tampilan Success Show graph
![tampilan-berhasil-show-graph](https://github.com/user-attachments/assets/d32a745f-7881-4d2e-b347-e0525a1ef479)

<br>

## `Tech Stacks`

1. [NestJS](https://nestjs.com/) (Node framework)
2. [NextJS](https://nextjs.org/) (React Framework)
3. [MongoDB](https://www.mongodb.com/docs/manual/installation/) (Database)


