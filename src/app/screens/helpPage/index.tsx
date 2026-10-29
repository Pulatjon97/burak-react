import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/
  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="Help topics"
                className={"table_list"}
              >
                <Tab
                  id="help-tab-1"
                  aria-controls="help-tabpanel-1"
                  label="TERMS"
                  value="1"
                />
                <Tab
                  id="help-tab-2"
                  aria-controls="help-tabpanel-2"
                  label="FAQ"
                  value="2"
                />
                <Tab
                  id="help-tab-3"
                  aria-controls="help-tabpanel-3"
                  label="CONTACT"
                  value="3"
                />
              </Tabs>
            </Box>
          </Box>
          <Stack>
            <Stack className={"help-main-content"}>
              <TabPanel
                className="help-panel"
                value="1"
                id="help-tabpanel-1"
                aria-labelledby="help-tab-1"
              >
                <Stack className={"rules-box"}>
                  <Box className={"rules-frame"}>
                    {terms.map((value, number) => {
                      return <p key={number}>{value}</p>;
                    })}
                  </Box>
                </Stack>
              </TabPanel>
              <TabPanel
                className="help-panel"
                value="2"
                id="help-tabpanel-2"
                aria-labelledby="help-tab-2"
              >
                <Stack className={"accordion-menu"}>
                  {faq.map((value, number) => {
                    return (
                      <Accordion key={number}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`faq-panel-${number}`}
                          id={`faq-header-${number}`}
                        >
                          <Typography>{value.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          id={`faq-panel-${number}`}
                          aria-labelledby={`faq-header-${number}`}
                        >
                          <Typography>{value.answer}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Stack>
              </TabPanel>
              <TabPanel
                className="help-panel"
                value="3"
                id="help-tabpanel-3"
                aria-labelledby="help-tab-3"
              >
                <Stack className={"admin-letter-box"}>
                  <Stack className={"admin-letter-container"}>
                    <Box className={"admin-letter-frame"}>
                      <span>Contact us!</span>
                      <p>Fill out below form to send a message!</p>
                    </Box>
                    <form
                      action={"#"}
                      method={"POST"}
                      className={"admin-letter-frame"}
                    >
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-name">Your name</label>
                        <input
                          id="help-name"
                          type={"text"}
                          name={"memberNick"}
                          placeholder={"Type your name here"}
                          autoComplete="name"
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-email">Your email</label>
                        <input
                          id="help-email"
                          type="email"
                          name={"memberEmail"}
                          placeholder={"Type your email here"}
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div className={"admin-input-box"}>
                        <label htmlFor="help-message">Message</label>
                        <textarea
                          id="help-message"
                          name={"memberMsg"}
                          placeholder={"Your message"}
                          required
                        ></textarea>
                      </div>
                      <Box
                        sx={{
                          mt: "30px",
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button type={"submit"} variant="contained">
                          Send
                        </Button>
                      </Box>
                    </form>
                  </Stack>
                </Stack>
              </TabPanel>
            </Stack>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
