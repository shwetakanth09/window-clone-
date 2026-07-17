import styled from 'styled-components'

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: 'MS Sans Serif', 'Microsoft Sans Serif', Tahoma, sans-serif;
  font-size: 12px;
  background: #c0c0c0;
`

const FormArea = styled.div`
  flex: 1;
  background: #c0c0c0;
  padding: 12px;
  overflow-y: auto;
`

const Title = styled.h2`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #808080;
`

const FieldGroup = styled.div`
  margin-bottom: 12px;
`

const Label = styled.label`
  display: block;
  font-size: 11px;
  margin-bottom: 4px;
  font-weight: bold;
`

const SunkenField = styled.div`
  background: #fff;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  box-shadow: inset 1px 1px 0 #404040, inset -1px -1px 0 #dfdfdf;
  padding: 4px 6px;
  font-size: 12px;
  color: #000;
  min-height: 20px;
  word-break: break-all;
`

const LinkText = styled.a`
  color: #0000ee;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    color: #551a8b;
  }

  &:visited {
    color: #551a8b;
  }
`

const Button = styled.button`
  font-family: inherit;
  font-size: 12px;
  padding: 4px 16px;
  background: #c0c0c0;
  border-top: 2px solid #fff;
  border-left: 2px solid #fff;
  border-right: 2px solid #404040;
  border-bottom: 2px solid #404040;
  box-shadow: inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080;
  cursor: pointer;
  margin-top: 12px;

  &:active {
    border-top: 2px solid #404040;
    border-left: 2px solid #404040;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    box-shadow: inset 1px 1px 0 #808080;
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`

const Separator = styled.hr`
  border: none;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #fff;
  margin: 12px 0;
`

export default function ContactApp({ onClose }) {
  const handleSend = () => {
    alert('Message feature not yet implemented!')
  }

  return (
    <AppContainer>
      <FormArea>
        <Title>Contact Information</Title>

        <FieldGroup>
          <Label>Email:</Label>
          <SunkenField>redacted@email.com</SunkenField>
        </FieldGroup>

        <FieldGroup>
          <Label>Discord:</Label>
          <SunkenField>
            <LinkText
              href="https://redacted.bio/xque"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://redacted.bio/xque
            </LinkText>
          </SunkenField>
        </FieldGroup>

        <FieldGroup>
          <Label>GitHub:</Label>
          <SunkenField>
            <LinkText
              href="https://github.com/xqyet"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/xqyet
            </LinkText>
          </SunkenField>
        </FieldGroup>

        <Separator />

        <FieldGroup>
          <Label>Message:</Label>
          <SunkenField as="textarea" style={{ minHeight: 60, resize: 'vertical' }} />
        </FieldGroup>

        <ButtonRow>
          <Button onClick={handleSend}>Send Message</Button>
          <Button onClick={onClose}>Close</Button>
        </ButtonRow>
      </FormArea>
    </AppContainer>
  )
}
