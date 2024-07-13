import { useState } from "react";
import TableComponent from "./ClaudeTable"

interface confirmSchemaProps {
  isActive: boolean;
  onClickBack: () => void;
  onClickNext: () => void;
}

const ConfirmSchema = ({
  isActive,
  onClickBack,
  onClickNext,
}: confirmSchemaProps) => {
  return (
    <>
      <div className="block">
        <h4 className="text-base text-left text-indigo-600 mb-2">
          Confirm Schema
        </h4>

        {!isActive && <TableComponent />}
      </div>
    </>
  );
};

export default ConfirmSchema;
