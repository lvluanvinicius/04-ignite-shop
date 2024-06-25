import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import { stripe } from "../../libs/stripe";
import Stripe from "stripe";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  };
}

export default function Product({ product }: ProductProps) {
  // const { isFallback } = useRouter();
  // if (!isFallback)
  //   return (
  //     <ProductContainer>
  //       <ImageContainer>teste</ImageContainer>

  //       <ProductDetails>
  //         <h1>teste</h1>
  //         <span>teste</span>

  //         <p>teste</p>

  //         <button>Comprar</button>
  //       </ProductDetails>
  //     </ProductContainer>
  //   );

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button>Comprar</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: { id: "prod_QLCpowOaYlj3J8" },
      },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        description: product.description,
        price: new Intl.NumberFormat("pt-BR", {
          currency: "BRL",
          style: "currency",
        }).format(price.unit_amount / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  };
};
