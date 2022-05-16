import React from 'react';
import { Form, Input, FormGroup, Label } from "reactstrap";

export default function Switch (props){
const toggle = props.toggle

return(
    <Form>
    <FormGroup switch="true">
    <Input
      type="switch"
      onChange={toggle}
      checked="false"
    />
    <Label switch="true">Toggle All Spots</Label>
  </FormGroup>
  </Form>
)
}