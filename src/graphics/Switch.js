import React from 'react';
import { Form, Input, FormGroup, Label } from "reactstrap";

export default function Switch (props){
const toggle = props.toggle

return(
    <Form>
    <FormGroup switch="true" style={{width:"175px", margin:"auto"}}>
    <Input
      type="switch"
      onChange={toggle}
    />
    <Label switch="true">Toggle All Spots</Label>
  </FormGroup>
  </Form>
)
}