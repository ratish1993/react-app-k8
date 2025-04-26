import _ from "lodash";
import React, { useState } from "react";

export default function AdvanceFilter({
  allEquipmentTypes,
  setAdvanceFilter,
  advFilter,
  getAllEquipments,
}) {
  const [allModel, setAllModel] = useState({});
  const [allSpecification, setAllSpecification] = useState([]);

  const handleOnChange = (e) => {
    let { name, value } = e.target;

    advFilter[name] = value;

    if (name === "equipment_type_id" && value) {
      let { specification_details, model_number } = _.find(
        allEquipmentTypes,
        (o) => {
          return o.name === value;
        }
      );
      setAllSpecification(specification_details);
      setAllModel(model_number);
      advFilter.model_name = "";
    }

    advFilter[name] = value;

    setAdvanceFilter({ ...advFilter });
  };

  return (
    <div
      id="settings-popup"
      className="sb-setting-popup e-lib e-popup e-control e-popup-open"
    >
      <div className="sb-setting-header">
        <span> Filter</span>
      </div>
      <div className="sb-setting-content">
        <div className="sb-setting-item sb-setting-culture">
          <div className="setting-label">
            {/* <div className="sb-icons sb-setting-icons sb-icon-Localization"></div> */}
            <div className="sb-setting-text">Equipment Type</div>
          </div>
          <div className="setting-content">
            <select
              aria-hidden="true"
              aria-label="dropdownlist"
              className="e-ddl-hidden"
              name="equipment_type_id"
              id="sb-setting-culture_hidden"
              value={advFilter.equipment_type_id}
              onChange={handleOnChange}
            >
              <option value="">Select Equipment Type</option>
              {allEquipmentTypes.map((item, key) => {
                return (
                  <option key={key} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="sb-setting-item sb-setting-currency">
          <div className="setting-label">
            <div className="sb-setting-text">
              {allModel.lebel || "Equipment Model"}
            </div>
          </div>
          <div className="setting-content">
            <select
              id="sb-setting-currency"
              className="sb-setting-currency-content e-control e-dropdownlist e-lib"
              aria-disabled="false"
              name="model_name"
              value={advFilter.model_name}
              onChange={handleOnChange}
            >
              <option value="">Select Model</option>
              {allModel.value?.map((model, key) => {
                return (
                  <option key={key} value={model}>
                    {model}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <button onClick={getAllEquipments}>Apply</button>
    </div>
  );
}
