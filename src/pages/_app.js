import { ChakraProvider } from '@chakra-ui/react';
import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/main.scss';

export default function App({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}
