import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UpdateSupplier from '../../../../components/supplier/UpdateSupplier';
import { GRAPHQL_QUERY_POLICY } from '../../../../constants';
import { Supplier, useFetchAllSuppliersQuery } from '../../../../generated';
import { ParamsType } from '../../../../interfaceTypes';

const SupplierDetail = () => {
    const { id } = useParams<ParamsType>();
    const [supplierList, setSupplierList] = useState<Supplier[]>([]);
    const [supplier, setSupplier] = useState({});

    const { refetch } = useFetchAllSuppliersQuery({
        ...(GRAPHQL_QUERY_POLICY) as any,
        variables: { suppliersInput: { paginationOptions: { page: 1, limit: 100 } }, },
        onCompleted(data) {
            if (data?.fetchAllSuppliers && Array.isArray(data?.fetchAllSuppliers?.suppliers))
                setSupplierList(data?.fetchAllSuppliers?.suppliers as Supplier[]);
        }
    });

    useEffect(() => {
        if (supplierList.length) {
            const user = supplierList?.find((qs) => qs?.id === id);
            setSupplier(user as Supplier);
        }
        else setSupplier({});
    }, [supplierList, id]);


    return (
        <div>
            <UpdateSupplier supplier={supplier} setSupplier={setSupplier} refreshList={refetch} />
        </div>
    )
}

export default SupplierDetail;