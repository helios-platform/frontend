import { useState, useEffect, useCallback } from 'react';
import queryService from '../../api';
import { useIntegration } from '../../contexts/IntegrationContext';
import { useLocation } from 'react-router-dom';

export const useSQLConsole = () => {
  const [instanceInfo, setInstanceInfo] = useState({});
  const [selectedInfo, setSelectedInfo] = useState({
    database: "default",
    tableOptions: [],
    table: null,
  });
  const [query, setQuery] = useState("");
  const [tableInfo, setTableInfo] = useState({
    cols: [],
    rows: [],
    row_count: 0,
  });

  const { integrationName } = useIntegration();
  const location = useLocation();

  useEffect(() => {
    const fetchInstanceInfo = async () => {
      const data = await queryService.listDatabases();
      setInstanceInfo(data);
      setSelectedInfo(prevState => ({
        ...prevState,
        tableOptions: data?.default || [],
        table: data?.default?.[0] || null,
      }));
    };
    fetchInstanceInfo();
  }, []);

  useEffect(() => {
    if (integrationName && (location?.state?.fromLink || selectedInfo.tableOptions.includes(integrationName))) {
      setSelectedInfo(prevState => ({
        ...prevState,
        table: integrationName
      }));
      if (location?.state?.fromLink) {
        window.history.replaceState({}, document.title);
      }
    }
  }, [location, integrationName, selectedInfo.tableOptions]);

  useEffect(() => {
    const fetchTableData = async () => {
      if (selectedInfo.database && selectedInfo.table) {
        const result = await queryService.executeQuery(
          `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`
        );
        if (result) {
          setTableInfo(result);
        }
      }
    };
    fetchTableData();
  }, [selectedInfo.database, selectedInfo.table]);

  const handleDatabaseSelect = useCallback((database: string) => {
    setSelectedInfo(prevState => ({
      database,
      tableOptions: instanceInfo[database] || [],
      table: instanceInfo[database]?.[0] || null
    }));
  }, [instanceInfo]);

  const handleTableSelect = useCallback((table: string) => {
    setSelectedInfo(prevState => ({ ...prevState, table }));
  }, []);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const handleRunQuery = useCallback(async () => {
    const result = await queryService.executeQuery(query || `SELECT * FROM ${selectedInfo.database}.${selectedInfo.table}`);
    if (result) {
      setTableInfo(result);
    }
  }, [query, selectedInfo.database, selectedInfo.table]);

  return {
    instanceInfo,
    selectedInfo,
    query,
    tableInfo,
    handleDatabaseSelect,
    handleTableSelect,
    handleQueryChange,
    handleRunQuery,
  };
};