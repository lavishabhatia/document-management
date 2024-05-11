/* eslint-disable react/prop-types */
import moment from "moment";
import { TBody, TD, TH, THead, TR, XTable } from "../ui/table/XTable";

const CartelTable = ({ cartelMemberList }) => { 

  return (
    <>
      <div className="w-full">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full ">
              <div className="overflow-hidden">
                <XTable className="min-w-full">
                  <THead className=" border-y text-[#64748B]">
                    <TR>
                      <TH>File</TH>
                      <TH>Major Head</TH>
                      <TH>Minor Head</TH>
                      <TH>Document Remarks</TH>
                      <TH>Customers </TH>
                      <TH>Uploaded By</TH>
                      <TH>Uploaded Time</TH>
                      <TH>Document Date</TH>
                    </TR>
                    </THead>
                  <TBody>
                    {cartelMemberList?.map((data) => (
                      <TR  key={data?.id}>
                        <TD className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#38BDF8]">
                          {data?.id}
                        </TD>
                        <TD className="tableData">{data?.username}</TD>
                        <TD className="tableData">{data?.business_name}</TD>
                        <TD className="tableData">
                          <span
                            className="px-2 py-0.5 bg-[#f2ebafb3] text-black rounded-md"
                          >
                            {data?.customers?.count}
                          </span>
                        </TD>
                       
                        <TD className="tableData">{data?.email}</TD>
                        <TD className="tableData text-[#475569] text-[14px]">
                          {moment(data?.createdAt).format("DD MMM YYYY hh:mm")}
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
    </>
  );
};

export default CartelTable;
