-- Enforce append-only immutability on audit_logs (P1 security requirement)

-- 1. Revoke UPDATE, DELETE, and TRUNCATE privileges from PUBLIC and codeone_user
REVOKE UPDATE, DELETE, TRUNCATE ON TABLE "audit_logs" FROM PUBLIC;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'codeone_user') THEN
    REVOKE UPDATE, DELETE, TRUNCATE ON TABLE "audit_logs" FROM codeone_user;
  END IF;
END
$$;

-- 2. Trigger guard so even privileged roles cannot update or delete audit_logs rows
CREATE OR REPLACE FUNCTION prevent_audit_log_mutation()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'audit_logs is append-only and cannot be updated or deleted';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_audit_logs_immutable ON "audit_logs";

CREATE TRIGGER trg_audit_logs_immutable
BEFORE UPDATE OR DELETE ON "audit_logs"
FOR EACH ROW
EXECUTE FUNCTION prevent_audit_log_mutation();
