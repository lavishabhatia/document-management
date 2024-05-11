
export const XTable = ({ children }) => {
    return (
        <table className="min-w-full">
          {children}
        </table>
    );
  };
  
  export const THead = ({ children }) => {
    return (
      <thead className=" border-y text-[#64748B] text-[14px] ">
        {children}
      </thead>
    );
  };
  
  export const TR = ({ children }) => {
    return <tr   className=" border-b hover:bg-gray-100 py-3">{children}</tr>;
  };
  
  export const TH = ({ children }) => {
    return (
      <th scope="col" className="tableHeading text-left py-2">
        {children}
      </th>
    );
  };
  
  export const TBody = ({ children }) => {
    return <tbody className="bg-white">{children}</tbody>;
  };
  
  export const TD = ({ children ,className , ...props}) => {
    return <td className={className} {...props}>{children}</td>;
  };