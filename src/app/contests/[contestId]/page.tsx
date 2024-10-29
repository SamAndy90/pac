import { Container, Title } from "@/common";

export type ContestPageType = {
  params: { contestId: string };
};

export default function ContestPage({ params }: ContestPageType) {
  return (
    <section className={"mt-14 md:mt-20 py-12"}>
      <Container>
        <div>
          <Title>Contest name</Title>
          <p>{params.contestId}</p>
        </div>
      </Container>
    </section>
  );
}
