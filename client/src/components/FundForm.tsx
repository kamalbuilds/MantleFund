import { Container, Paper, Title } from "@mantine/core";
import { z } from "zod";
import Form, { FormProps } from "./Form";
import LabeledTextField from "./FormField";

export function FundForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <Paper bg="gray" shadow="sm" radius="md" p="xl" className="space-y-10">
        <Title align="center" order={3}>
          Back the Campaign 
        </Title>
        <LabeledTextField
          name="amount"
          label="Fund Amount"
          placeholder="ETH 0.1 "
          type="number"
          required
          step={0.01}
          precision={10}
          removeTrailingZeros
        />
      </Paper>
    </Form>
  );
}
