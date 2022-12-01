import DivisionByOne from "./DivisionByOne";
import DivisionByVariable from "./DivisionByVariable";
import DivisionByZero from "./DivisionByZero"
import MultiplicationByOne from "./MultiplicationByOne";
import MultiplicationByVariable from "./MultiplicationByVariable";
import MultiplicationByZero from "./MultiplicationByZero";

const Errors = () => {
  return (
    <>
      <MultiplicationByZero />
      <DivisionByZero />
      <MultiplicationByOne />
      <DivisionByOne />
      <DivisionByVariable />
      <MultiplicationByVariable />
    </>
  )
}

export default Errors;