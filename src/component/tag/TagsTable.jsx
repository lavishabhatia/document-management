/* eslint-disable react/prop-types */
import moment from "moment";
import { TBody, TD, TH, THead, TR, XTable } from "../ui/table/XTable";
import { useEffect, useState } from "react";
import Searchbar from "../ui/SearchBar";
import { uploadTag } from "../../services/tag";

const TagsTable = () => {
  const [tagTableData, setTagTableData] = useState([]);

  const dashboardData = async () => {
    try {
      let res = await uploadTag(search);
      if (res?.status === 200) {
        setTagTableData(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dashboardData();
  }, []);

  return (
    <div className="flex flex-col my-5 gap-4">
      <Searchbar search={search} setSearch={setSearch} action={dashboardData} />

      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <XTable className="min-w-full">
                  <THead className="py-2 text-[#64748B]">
                    <TR>
                      <TH>Id</TH>
                      <TH>Label</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {tagTableData?.map((data, i) => (
                      <TR key={i}>
                        <TD>{data?.id}</TD>
                        <TD>{data?.label}</TD>
                      </TR>
                    ))}
                  </TBody>
                </XTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsTable;
