const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Render에 등록한 DATABASE_URL 환경변수를 사용합니다.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Neon 접속 시 필요한 SSL 설정
  }
});

app.get('/', async (req, res) => {
  try {
    // test 테이블에서 가장 상단의 레코드 하나를 가져옵니다.
    const result = await pool.query('SELECT name FROM test LIMIT 1');
    
    if (result.rows.length > 0) {
      const userName = result.rows[0].name;
      res.send(`<h1>HELLO ${userName}</h1>`);
    } else {
      res.send('<h1>데이터가 없습니다. 테이블을 확인해주세요.</h1>');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
