import { ActionIcon, Box, Flex, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import imgChart from "../assets/chart.svg";
import imgChart1 from "../assets/charts.svg";
export default function ChartContainer() {
    const CHART_BG = "#0A1F44";
    const CHART_WIDTH = "949px";
    const CHART_HEIGHT = "804.144px";
        const theme = useMantineTheme();
        const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
    return (
        <Box
            w={isMobile ? "100%" :CHART_WIDTH}
            h={CHART_HEIGHT}
            bg={CHART_BG}
            p="sm"
            style={{ 
                borderRadius: '8px', 
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
            }}
        >
            <Flex justify="space-between" align="center" pl="20px">
                <Flex>
                <Text fz={"20px"} fw={400} style={{lineHeight: "150%"}} c="#FF9B42">XAG</Text>
                <Text fz={"20px"} fw={400} style={{lineHeight: "150%"}} c="#666">/USD</Text>
                </Flex>
                <Flex gap="md" c="white" justify={"space-between"} align={"center"}>
                    {['1m', '5m', '30m', '1h', '1d', '1w'].map(time => (
                        <Text 
                            key={time} 
                            fz={"15px"} 
                            fw={time === '1h' ? '800' : '200'} 
                            style={{ cursor: 'pointer', lineHeight: "150%" }}
                        >
                            {time}
                        </Text>
                    ))}
                </Flex>
                <Flex gap={"20px"}>
                    <ActionIcon variant="transparent" c="white" w={"47px"}  >
                        <img src={imgChart} alt="img-chart" />
                    </ActionIcon>
                    <ActionIcon variant="transparent" c="white"  w={"54.735px"} h={"38.922px"} style={{borderRadius: "50%", border:"1px solid #FF9B42"}}>
                        <img src={imgChart1} alt="img-chart"/>
                    </ActionIcon>

                </Flex>
            </Flex>
            <Box 
                style={{ 
                    position: 'absolute', 
                    top: '63px', 
                    bottom: '20px', 
                    left: '10px', 
                    right: '10px', 
                    display: 'grid',
                    gridTemplateColumns: '1fr 60px', 
                    gap: '5px'
                }}
            >
                <Box style={{ backgroundColor: CHART_BG, position: 'relative' }}>
                    <Flex 
                        justify="space-between" 
                        style={{ position: 'absolute', bottom: 0, width: '100%', padding: '0 10px' }}
                    >
                        {['1:00', '2:00', '3:00', '5:00', '6:00'].map(time => (
                            <Text key={time} size="xs" c="#888">
                                {time}
                            </Text>
                        ))}
                    </Flex>
                    <Box style={{ width: '100%', height: '90%', background: 'repeating-linear-gradient(to top, #1A3050, #1A3050 1px, transparent 1px, transparent 80px)' }} />
                </Box>
                <Flex direction="column" justify="space-between" c="#E0E0E0" fz="sm">
                    {['9,225.0', '9,200.0', '9,175.0', '9,150.0', '9,125.0', '9,100.0', '9,075.0', '9,050.0', '9,025.0', '9,000.0'].map(price => (
                        <Text key={price} size="xs" ta="right">
                            {price}
                        </Text>
                    ))}
                </Flex>
            </Box>
        </Box>
    );
}