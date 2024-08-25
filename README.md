

    <h1>React + Vite Project Setup</h1>

    <div class="section">
        <h2>Prerequisites</h2>
        <p>Ensure you have Node.js v16.20.0 installed on your machine.</p>
    </div>

    <div class="section">
        <h2>Getting Started</h2>
        <h3>Install Dependencies:</h3>
        <pre><code>npm install</code></pre>

        <h3>Start the Development Server:</h3>
        <pre><code>npm run dev</code></pre>

        <p>The application will be available at <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a></p>
        <p>Ensure the backend is running on <a href="http://localhost:8080/" target="_blank">http://localhost:8080/</a></p>
    </div>

    <div class="section">
        <h2>Frontend</h2>
        <p><strong>Vite:</strong> 5.4.1</p>
        <p><strong>React:</strong> 18.3.1</p>
        <p><strong>Redux Toolkit:</strong> 1.9.3</p>
        <p><strong>Ant Design:</strong> 5.4</p>
        <p><strong>React Router DOM:</strong> 6.9.0</p>
    </div>

    <div class="section">
        <h2>Backend Setup</h2>
        <h3>Database Configuration:</h3>
        <p>Install and start MySQL.</p>
        <p>Create the database:</p>
        <pre><code>CREATE DATABASE DemoSpringSecurity;</code></pre>

        <p>Update <code>application.yml</code>:</p>
        <p>Replace the placeholders with your MySQL username and password:</p>
        <pre><code>
datasource:
  url: jdbc:mysql://localhost:3306/DemoSpringSecurity?useSSL=false&serverTimezone=UTC
  username: YOUR_MYSQL_USERNAME
  password: YOUR_MYSQL_PASSWORD
        </code></pre>

        <p>Ensure MySQL is running before starting the backend.</p>
    </div>

    <div class="section">
        <h2>Backend Technologies</h2>
        <ul>
            <li>Java Spring Boot</li>
            <li>JPA</li>
            <li>Spring Security OAuth2 Resource Server - JWT</li>
            <li>Swagger</li>
            <li>MySQL</li>
        </ul>
    </div>
