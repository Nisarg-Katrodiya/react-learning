import {ReactElement, FC} from "react";
import {Typography, Stack, Container} from "@mui/material";

// import {
//   ProductList,
// 	ProductSort
// } from '../components/Dashboard/Products';

const Home: FC = (): ReactElement => {

	return (
		<>
      <Container>
        <Typography variant="h3" sx={{ mb: 5, display: 'flex', justifyContent: 'center'}}>
          Product Listing
        </Typography>

        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            {/* <ProductSort /> */}
          </Stack>
        </Stack>

        {/* <ProductList products={[]} /> */}
      </Container>
		</>
	);
};

export default Home;