import { Container } from "./styles";

export function Ingredient({ title, ...rest }: { title: string; rest: any }) {
  return <Container {...rest}>{title}</Container>;
}
