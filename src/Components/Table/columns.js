export const COLUMNS = [
    {
        Header: "ID",
        accessor: 'id',
    },
    {
        Header: "Email",
        accessor: 'email',
    },
    {
        Header: "First Name",
        accessor: 'first_name',
    },
    {
        Header: "Last Name",
        accessor: 'last_name',
    },
    {
        Header: "User Name",
        accessor: 'username',
    },
    {
        Header: "Pay Status",
        accessor: 'pay_status',
        id: "pay",
        Cell: ({ row }) => (<span>{row.values.pay ? "Payable" : "Not Payable"}</span>),
        disableSortBy: true

    },
    {
        Header: "Link",
        accessor: 'profile_link',
        id: 'links',
        Cell: ({ row }) => (<a href={row.values.links} target="_blank">{`Link`}</a>),
        disableSortBy: true
    },
]