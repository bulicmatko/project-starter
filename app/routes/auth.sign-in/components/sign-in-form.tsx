import { useIntl } from "react-intl";
import { TbLock, TbUser } from "react-icons/tb";

import { Box, Button, Grid, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { email, maxLength, minLength, pipe, string, transform } from "valibot";

/**
 * Form Values
 * */
type FormValues = {
  email: string;
  password: string;
};

/**
 * Sign In Form
 * */
export function SignInForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues?: Partial<FormValues>;
  onSubmit: ({ values }: { values: FormValues }) => unknown;
}) {
  const intl = useIntl();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      ...defaultValues,
    },
    onSubmit: ({ value }) => onSubmit({ values: value }),
  });

  return (
    <Box
      component="form"
      noValidate={true}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <Grid>
        <Grid.Col span={{ base: 12 }}>
          <form.Field
            name="email"
            validators={{
              onChange: pipe(
                string(),
                transform((v) => v.trim()),
                minLength(1, () =>
                  intl.formatMessage({
                    id: "YgOKNm",
                    defaultMessage: "Enter your email address",
                    description: "Input validation message.",
                  }),
                ),
                email(() =>
                  intl.formatMessage({
                    id: "3UQpW5",
                    defaultMessage: "Email address invalid",
                    description: "Input validation message.",
                  }),
                ),
                maxLength(100, ({ requirement }) =>
                  intl.formatMessage(
                    {
                      id: "tXQuOo",
                      defaultMessage: "Email address too long (max: {value})",
                      description: "Input validation message.",
                    },
                    { value: requirement },
                  ),
                ),
              ),
            }}
          >
            {(field) => (
              <TextInput
                type="email"
                name={field.name}
                leftSection={<Box component={TbUser} />}
                label={intl.formatMessage({
                  id: "F6nHmv",
                  defaultMessage: "Email",
                  description: "Input label.",
                })}
                placeholder={intl.formatMessage({
                  id: "Bbv3im",
                  defaultMessage: "Enter your email address",
                  description: "Input placeholder.",
                })}
                error={field.state.meta.errors.at(0)?.message}
                required={true}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </form.Field>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }}>
          <form.Field
            name="password"
            validators={{
              onChange: pipe(
                string(),
                minLength(1, () =>
                  intl.formatMessage({
                    id: "Nvwpni",
                    defaultMessage: "Enter your password",
                    description: "Input validation message.",
                  }),
                ),
                minLength(6, ({ requirement }) =>
                  intl.formatMessage(
                    {
                      id: "yz0d24",
                      defaultMessage: "Password too short (min: {value})",
                      description: "Input validation message.",
                    },
                    { value: requirement },
                  ),
                ),
                maxLength(72, ({ requirement }) =>
                  intl.formatMessage(
                    {
                      id: "Tohgxc",
                      defaultMessage: "Password too long (max: {value})",
                      description: "Input validation message.",
                    },
                    { value: requirement },
                  ),
                ),
              ),
            }}
          >
            {(field) => (
              <PasswordInput
                type="password"
                name={field.name}
                leftSection={<Box component={TbLock} />}
                label={intl.formatMessage({
                  id: "10NrHv",
                  defaultMessage: "Password",
                  description: "Input label.",
                })}
                placeholder={intl.formatMessage({
                  id: "xBBues",
                  defaultMessage: "Enter your password",
                  description: "Input placeholder.",
                })}
                error={field.state.meta.errors.at(0)?.message}
                required={true}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            )}
          </form.Field>
        </Grid.Col>

        <Grid.Col span={{ base: 12 }} mt="lg">
          <form.Subscribe
            selector={(formState) => [
              formState.canSubmit,
              formState.isSubmitting,
            ]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                variant="filled"
                fullWidth={true}
                loading={isSubmitting}
                disabled={!canSubmit}
              >
                {intl.formatMessage({
                  id: "gynqZG",
                  defaultMessage: "Sign In",
                  description: "Button label.",
                })}
              </Button>
            )}
          </form.Subscribe>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
