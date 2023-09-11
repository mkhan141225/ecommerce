import React from "react";

const CategoryForm = ({value,setValue,handleSubmit}) => {
  return (
    <div>
      CategoryForm
      <>
        <form onSubmit = {handleSubmit}>
          <div className="mb-3">
            <input
              type="text "
              className="form-control"
              placeholder="Enter new category " 
              value={value}
              onChange={(e)=>setValue (e.target.value) }
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    </div>
  );
};

export default CategoryForm;
