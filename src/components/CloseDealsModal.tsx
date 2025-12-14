import { Button, Flex, Modal, Text, Loader } from "@mantine/core";

interface CloseDealsModalProps {
    opened: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isUpdating: boolean;
    dealId: string;
}

export default function CloseDealsModal({ opened, onClose, onConfirm, isUpdating }: CloseDealsModalProps) {
    const handleClose = () => {
        if (!isUpdating) {
            onClose();
        }
    };
    const isConfirmDisabled = isUpdating; 
    return(
        <Modal
            w={"721px"}
            opened={opened}
            onClose={handleClose} 
            withCloseButton={false}
            closeOnClickOutside={false}
            centered
            overlayProps={{
                backgroundOpacity: 0.85, 
                blur: 1,
            }}
            styles={{
                content: {
                    minWidth: "721px",
                    backgroundColor: '#0A1F44',
                    border: '2px solid #FF9B42', 
                    borderRadius: '20px',
                    padding: '20px 30px',
                    boxShadow: "-6px 7px 0px #FF9B42",
                },
                header: {
                    backgroundColor: '#0A1F44',
                    borderBottom: 'none',
                    paddingBottom: 0,
                    padding: '0',
                    height: '0',
                    margin: '0'
                },
                body: {
                    paddingTop: '30px',
                }
            }}
        >
            <Flex direction="column" gap="xl" align="center">
                <Flex direction={"column"} gap={"20px"}>
                    <Text c={"#FFF"} fz={"32px"} fw={"500"} lh={"100%"} style={{textAlign: "center", fontFamily: "'Inter', sans-serif"}}>
                        Close Deal Confirmation
                    </Text>
                    <Text c={"#FFFFFF"} fz={"32px"} fw={"600"} style={{textAlign: "center", fontFamily: "'Inter', sans-serif"}}>
                        You are about to close this deal.
                    </Text>
                </Flex>
                <Flex gap="40px" mt="xl" w="100%" justify="center">
                    <Button 
                        onClick={onConfirm} 
                        w={"139px"}
                        h={"55px"}
                        radius={"20px"}
                        size="md"
                        fw={"400"}
                        bg={"#0A1F44"}
                        style={{ border: '3px solid #E25C5C', fontFamily: "'Inter', sans-serif" }}
                        c={"#F8F9FB"}
                        disabled={isConfirmDisabled} 
                        leftSection={isUpdating ? <Loader size="xs" color="white" /> : null}
                    >
                        {isUpdating ? 'Closing...' : 'Close Deal'}
                    </Button>
                    <Button 
                        onClick={handleClose} 
                        w={"139px"}
                        h={"55px"}
                        radius={"20px"}
                        size="md"
                        fw={"400"}
                        bg={"#0A1F44"}
                        style={{ border: '3px solid #FF9B42',fontFamily: "'Inter', sans-serif" }}
                        c={"#F8F9FB"}
                        disabled={isUpdating}
                    >
                        Cancel
                    </Button>
                </Flex>
            </Flex>
        </Modal>
    )
}