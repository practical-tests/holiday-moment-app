import { Formik } from "formik";
import { useCallback, useContext, useEffect } from "react";
import { Box, Button, Center, Container, useToast } from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Holiday } from "../../types";
import { usePromise } from "../../hooks";
import { RootRoutesType } from "../types";
import { AppContext } from "../../context";
import { Loading } from "../../components/Loading";
import { editHolidayValidationSchema } from "./validationForm";
import {
  DateControl,
  InputControl,
  TextAreaControl,
} from "../../components/Form";

interface EditHolidayProps
  extends NativeStackScreenProps<RootRoutesType, "EditHoliday"> {}

const EditHoliday: React.FC<EditHolidayProps> = ({ route, navigation }) => {
  const { holidayDb, setTitle } = useContext(AppContext);
  const toast = useToast();

  const { params } = route;

  const { data, loading } = usePromise(async () => holidayDb.get(params.id), {
    callOnStart: true,
  });

  const onSubmit = useCallback(
    async (changeData: Holiday) => {
      await holidayDb.insert(data.id, { ...data, ...changeData });
      toast.show({
        title: "Feriado alterado",
      });
    },
    [data]
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setTitle("Edição de feriado");
    });
    return unsubscribe;
  }, []);

  if (loading.isLoading)
    return (
      <Center height="full">
        <Loading />
      </Center>
    );

  return (
    <Center pt="3">
      <Container width="full">
        <Formik
          initialValues={data}
          validationSchema={editHolidayValidationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, values, errors, setFieldValue, isSubmitting }) => (
            <>
              <InputControl
                label="Titulo"
                error={errors.title}
                type="text"
                defaultValue={values.title}
                placeholder={values.title}
                onChangeText={(e) => setFieldValue("title", e)}
                isDisabled={isSubmitting}
              />

              <TextAreaControl
                label="Descrição"
                error={errors.description}
                autoCompleteType={false}
                defaultValue={values.description}
                placeholder={values.description}
                onChangeText={(e) => setFieldValue("description", e)}
                isDisabled={isSubmitting}
              />

              <TextAreaControl
                label="Legislação"
                error={errors.legislation}
                autoCompleteType={false}
                defaultValue={values.legislation}
                placeholder={values.legislation}
                onChangeText={(e) => setFieldValue("legislation", e)}
                isDisabled={isSubmitting}
              />

              <DateControl
                label="Data"
                error={""}
                value={values.date}
                format="DD/MM/YYYY"
                onChange={(value) => setFieldValue("date", value)}
                isDisabled={isSubmitting}
              />

              <Box mt="4" w="full">
                <Button
                  onPress={() => handleSubmit()}
                  w="full"
                  colorScheme={"blue"}
                >
                  Salvar
                </Button>
              </Box>
            </>
          )}
        </Formik>
      </Container>
    </Center>
  );
};

export { EditHoliday };
