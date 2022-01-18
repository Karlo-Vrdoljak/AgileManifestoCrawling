import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { TreeTable } from "primereact/treetable";
import { useState } from "react";
import fetcher from "./../util/index";

export async function getServerSideProps(context) {
  const data = await fetcher(`${process.env.API_URL}data`);
  return {
    props: { manifesto: data },
  };
}

export default function Home(props) {
  const { manifesto: initManifesto } = props;

  const parseEmail = (email) =>
    email?.startsWith("mailto:") ? email.split("mailto:")[1] : email;

  const emailTemplate = (email) => (
    <a href={`mailto:${email}`} className="text-blue-600">
      {email}
    </a>
  );

  const websiteTemplate = (website) => {
    return (
      <a href={website} target="_blank" className="text-blue-600">
        {website}
      </a>
    );
  };

  const mapToTree = (data) =>
    data.map(({ signatures, period }, i) => ({
      data: { period },
      children: signatures.map(({ email, name, website }, j) => ({
        data: {
          email: emailTemplate(parseEmail(email)),
          name: name ?? null,
          website: websiteTemplate(website) ?? null,
        },
        key: `${i}-${j}`,
      })),
      key: `${i}`,
    }));

  const [manifesto, setmanifesto] = useState(mapToTree(initManifesto));
  const [globalFilter, setglobalFilter] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target?.value;
    setglobalFilter(value ?? "");
  };

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between">
        <h5 className="flex items-center justify-center">
          The Agile Manifesto
        </h5>
        <div className="flex items-center justify-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="container w-full flex flex-col mx-auto p-6">
      <TreeTable
        className="shadow-lg shadow-sky-300/25"
        value={manifesto}
        paginator
        rows={8}
        globalFilter={globalFilter}
        header={header}
      >
        <Column field="period" header="Period" expander></Column>
        <Column field="email" header="Email"></Column>
        <Column field="name" header="Signatory"></Column>
        <Column field="website" header="Website"></Column>
      </TreeTable>
    </div>
  );
}
