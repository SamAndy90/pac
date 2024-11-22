import { Container, Title } from "@/common";
import { Post } from "./News";
import NewsList from "./NewsList";
import { Button } from "../../common/UI/Button";
import Link from "next/link";

export type MoreNewsProps = {
  data: Post[];
};

export default function MoreNews({ data = [] }: MoreNewsProps) {
  return (
    <section className={"mb-24 lg:mb-40"}>
      <Container>
        <div className={"flex flex-col gap-8"}>
          <Title>More News!</Title>
          <NewsList news={data} />
          <Link href={"/peace-adventures"} className={"sm:self-center"}>
            <Button
              fullWidth
              className={"tracking-wider mx-auto border-pka_background"}
            >
              To Journal
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
