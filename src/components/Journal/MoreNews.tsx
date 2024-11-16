import { Container, Title } from "@/common";
import { Post } from "./News";
import NewsList from "./NewsList";
import { NewButton } from "../../common/UI/NewButton";
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
          <Link href={"/journal"} className={"sm:self-center"}>
            <NewButton
              fullWidth
              className={"tracking-wider mx-auto border-pka_background"}
            >
              To Journal
            </NewButton>
          </Link>
        </div>
      </Container>
    </section>
  );
}
