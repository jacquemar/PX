import React from "react";

const TextInput = (props) => {
  return (
    <div style={{ marginBottom: "30px", width: "100%" }}>
      <Input
        {...props}
        color="lightBlue"
        size="regular"
        outline={true}
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        error={props.error}
        success={props.success}
      />
    </div>
  );
};

export default TextInput;
