import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ar" dir="rtl">
			<Head />
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.rtl.min.css"
				integrity="sha384-WJUUqfoMmnfkBLne5uxXj+na/c7sesSJ32gI7GfCk4zO4GthUKhSEGyvQ839BC51"
				crossOrigin="anonymous"
			/>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
