/* eslint-disable react/prop-types */
import moment from "moment";
import { TBody, TD, TH, THead, TR, XTable } from "../ui/table/XTable";
import { useEffect, useState } from "react";
import { searchUploadFile } from "../../services/uploadFile";
import Searchbar from "../ui/SearchBar";

const DashboardTable = () => {
  const [dashboardTableData, setDashboardTableData] = useState([]);
  const [search, setSearch] = useState("");

  const dashboardData = async (value) => {
    try {
      let searchData = {
        major_head: "",
        minor_head: "",
        from_date: "",
        to_date: "",
        tags: [],
        uploaded_by: "",
        start: 0,
        length: 10,
        filterId: "",
        search: {
          value: value || "",
        },
      }
      let res = await searchUploadFile(searchData);
      if (res?.status === 200) {
        setDashboardTableData(res?.data?.data);
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
      <Searchbar
        search={search}
        setSearch={setSearch}
        action={() => dashboardData(search)}
      />
      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <XTable className="min-w-full">
                  <THead className="py-2 text-[#64748B]">
                    <TR>
                      <TH>File</TH>
                      <TH>Major Head</TH>
                      <TH>Minor Head</TH>
                      <TH>Document Remarks</TH>
                      <TH>Uploaded By</TH>
                      <TH>Uploaded Time</TH>
                      <TH>Document Date</TH>
                    </TR>
                  </THead>
                  <TBody>
                    {dashboardTableData?.map((data) => (
                      <TR key={data?.id}>
                        <TD className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#38BDF8]">
                          <img src={data?.file_url} className="w-10 h-10" />
                        </TD>
                        <TD>{data?.major_head}</TD>
                        <TD>{data?.minor_head}</TD>
                        <TD>
                          <span className="px-2 py-0.5 bg-[#f2ebafb3] text-black rounded-md">
                            {data?.document_remarks}
                          </span>
                        </TD>
                        <TD>{data?.uploaded_by}</TD>
                        <TD>{moment(data?.upload_time).format("hh:mm")}</TD>
                        <TD className=" text-[#475569] text-[14px]">
                          {moment(data?.document_date).format("DD MMM YYYY")}
                        </TD>
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

export default DashboardTable;
