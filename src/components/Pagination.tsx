import { Flex, Pagination, Select, Text, useMantineTheme } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconArrowUp } from "@tabler/icons-react";
import classes from './PaginationStyles.module.css';
interface PaginationType {
    current_page: number;
    setItems_per_page: (value: number) => void;
    setCurrent_page: (page: number) => void;
    total_items: number;
    items_per_page: number;
    total_pages: number;
    setReFetch: (value: boolean) => void;
}

interface Props {
    store: PaginationType;
}

function CustomPagination({ store: useStore }: Props) {
    const theme = useMantineTheme();
    const { t } = useTranslation();
    return (
        <Flex justify="space-between" h="30px">
            {useStore.total_items !== 0 && (
                <Flex gap={"5px"}>
                    <Text
                        style={{ alignContent: "center", fontWeight: "400", color: "#717680" }}
                        fz="11px"
                        c={theme.other.primaryColor}
                        mr="6px"
                    >
                        {t("Showing")}
                    </Text>
                    <Select
                        radius="20px"
                        w="54px"
                        h="30px"
                        placeholder={useStore.items_per_page + "" || "Items per page"}
                        data={["5", "10", "15", "20", "30"]}
                        comboboxProps={{
                            transitionProps: { transition: "rotate-right", duration: 200 },
                        }}
                        onChange={(value) => {
                            useStore.setItems_per_page(Number(value));
                            useStore.setReFetch(true);
                        }}
                        rightSection={<IconArrowUp  fontSize={"15px"} style={{fontSize: "10px"}}/>}
                        size="xs"
                        styles={{
                            input: {
                                backgroundColor: theme.other.primaryColor,
                                color: theme.other.secondaryColor,
                            },
                            dropdown: {
                                color: theme.other.primaryColor,
                                backgroundColor: theme.other.bg,
                            },
                        }}
                    />
                    <Text
                        style={{ alignContent: "center", fontWeight: "400" }}
                        fz="11px"
                        c={theme.other.primaryColor}
                        ml="6px"
                    >
                        {t("out of")}
                    </Text>
                    <Text style={{ alignContent: "center", fontWeight: "400" }}
                        fz="11px"
                        c={theme.other.primaryColor}
                        ml="6px">{useStore.total_items}</Text>
                </Flex>
            )}
            <Pagination
                total={useStore.total_pages}
                value={useStore.current_page}
                onChange={(page) => useStore.setCurrent_page(page)}
                siblings={1}
                boundaries={1}
                classNames={{
                    control: classes.control,
                }}
            />
        </Flex>
    );
}

export default CustomPagination;